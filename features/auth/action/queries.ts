import { db } from "@/lib/db";

export const getUserById = async (id: string) => {
	try {
		return await db.user.findUnique({
			where: { id },
			include: { accounts: true },
		});
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const getAccountByUserId = async (userId: string) => {
	try {
		return await db.account.findFirst({
			where: {
				userId,
			},
		});
	} catch (error) {
		console.log(error);
		return null;
	}
};
