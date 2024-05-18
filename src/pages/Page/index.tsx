import React from "react";
import { MainLayout } from "@/components/layouts/main/MainLayout";

import PageWrapper from "@/components/PageView/ui/PageWrapper/PageWrapper";
import { useParams } from "react-router-dom";
import { useGetPageRealtimeDataQuery } from "@/api/pageRealtimeUpdate";

export const Page = () => {
	const location = useParams<{ id: string }>();

	return (
		<MainLayout>
			<PageWrapper pageId={location.id}/>
		</MainLayout>
	);
};
