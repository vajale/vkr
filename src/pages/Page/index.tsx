import React from "react";
import { MainLayout } from "@/components/layouts/main/MainLayout";

import PageWrapper from "@/components/PageView/ui/PageWrapper/PageWrapper";
import { useParams } from "react-router-dom";

export const Page = () => {
	const location = useParams<{ id: string }>();

	return (
		<MainLayout>
			<PageWrapper id={location.id}/>
		</MainLayout>
	);
};
