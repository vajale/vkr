import React, { memo, useEffect } from "react";
import { MainLayout } from "@/components/layouts/main/MainLayout";

import PageWrapper from "@/components/PageView/ui/PageWrapper/PageWrapper";
import { useParams } from "react-router-dom";
import { useRemoveUserActivityMutation, useSetUserActivityMutation } from "@/api/usersApi/usersService";

export const Page = memo(() => {
	const location = useParams<{ id: string }>();

	const pageId = location.id ?? "";

	const [updateUserActivity] = useSetUserActivityMutation();
	const [removeUserActivity] = useRemoveUserActivityMutation();

	useEffect(() => {
		updateUserActivity({ pageId });

		return () => {
			window.addEventListener("beforeunload", e => {
				removeUserActivity({ pageId });
			});
		};
	}, [pageId]);

	return (
		<MainLayout>
			<PageWrapper pageId={pageId}/>
		</MainLayout>
	);
});
