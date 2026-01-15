import { useEffect, useRef, useState, useCallback } from "react";
import io from "socket.io-client";

// In production, this should come from env or config
const SOCKET_URL = process.env.NEXT_PUBLIC_FLASK_API_URL || "http://localhost:5000";

interface UseExamSocketProps {
  examId: string;
  attemptId?: string; // Use attempt ID if available
  studentId: string;
  onConnect?: () => void;
  onDisconnect?: () => void;
}

export const useExamSocket = ({ examId, attemptId, studentId, onConnect, onDisconnect }: UseExamSocketProps) => {
  const socketRef = useRef<any>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if ((!examId && !attemptId) || !studentId) return;

    // Initialize Socket
    const socket = (io as any).default
      ? (io as any).default(SOCKET_URL, {
          transports: ["websocket"],
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
        })
      : io(SOCKET_URL, {
          transports: ["websocket"],
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
        });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Socket Connected:", socket.id);
      setIsConnected(true);

      // Join the specific exam room
      if (attemptId) {
        socket.emit("join_attempt", { attemptId });
      } else {
        socket.emit("join_exam", { examId, studentId });
      }

      if (onConnect) onConnect();
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket Disconnected");
      setIsConnected(false);
      if (onDisconnect) onDisconnect();
    });

    socket.on("join_success", (data: any) => {
      console.log("Exam/Attempt Joined:", data);
    });

    socket.on("violation_recorded", (data: any) => {
      console.log("Violation Ack:", data);
    });

    return () => {
      socket.disconnect();
    };
  }, [examId, attemptId, studentId]); // Re-connect if IDs change

  const reportViolation = useCallback(
    (type: string, message: string) => {
      if (socketRef.current && isConnected) {
        if (attemptId) {
          socketRef.current.emit("report_violation", {
            attemptId,
            type,
            message,
          });
        } else {
          socketRef.current.emit("report_violation", {
            examId,
            studentId,
            type,
            message,
          });
        }
      } else {
        console.warn("Socket not connected, cannot report violation:", type);
      }
    },
    [examId, attemptId, studentId, isConnected]
  );

  return {
    socket: socketRef.current,
    isConnected,
    reportViolation,
  };
};
