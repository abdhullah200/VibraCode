export function cleanEnv(value: string | undefined) {
	if (!value) return value;

	return value.trim().replace(/^['\"]|['\"]$/g, "");
}
