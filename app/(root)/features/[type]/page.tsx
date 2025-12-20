"use client";

import { useParams } from "next/navigation";
import { FEATURE_TITLES, FEATURE_DESCRIPTIONS } from "../constants";
import FeaturesHeader from "@/app/components/features/FeaturesHeader";
import VocabularyFeature from "@/app/components/features/vocabulary/VocabularyFeature";
import ListeningFeature from "@/app/components/features/listening/ListeningFeature";
import WritingFeature from "@/app/components/features/writing/WritingFeature";
import TranslatorFeature from "@/app/components/features/translator/TranslatorFeature";

export default function Features() {
  const params = useParams();
  const type = params?.type as string;
  
  const title = FEATURE_TITLES[type || ''] || 'Tính năng';
  const description = FEATURE_DESCRIPTIONS[type || ''] || 'Khám phá các tính năng hữu ích';

  return (
    <main className="min-h-screen bg-[#0f172a]">
      <div className="mx-auto px-4 py-12">
        <FeaturesHeader title={title} description={description} />

        {type === "vocabulary" && <VocabularyFeature />}
        {type === "listening" && <ListeningFeature />}
        {type === "writing" && <WritingFeature />}
        {type === "translator" && <TranslatorFeature />}
      </div>
    </main>
  );
}

