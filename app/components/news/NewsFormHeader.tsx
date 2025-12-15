import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

interface NewsFormHeaderProps {
  isEditMode: boolean;
  onBack?: () => void;
  title?: string;
}

export default function NewsFormHeader({ isEditMode, onBack, title }: NewsFormHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
          Quay lại
        </Button>
        <h1 className="text-2xl font-bold text-gray-800">
          {title || (isEditMode ? "Chỉnh sửa Thông báo" : "Thêm Thông báo mới")}
        </h1>
      </div>
    </div>
  );
}
