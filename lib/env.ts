export function cleanEnv(value: string | undefined) {
	if (!value) return value;

	return value.trim().replace(/^['\"]|['\"]$/g, "");
}

export function normalizeMongoUrl(value: string | undefined) {
	const cleaned = cleanEnv(value);
	if (!cleaned) return cleaned;

	try {
		const url = new URL(cleaned);
		url.searchParams.delete("ssl");
		url.searchParams.delete("tlsInsecure");
		return url.toString();
	} catch {
		return cleaned
			.replace(/([?&])ssl=true(&?)/i, "$1")
			.replace(/([?&])tlsInsecure=true(&?)/i, "$1")
			.replace(/[?&]$/, "")
			.replace(/\?&/, "?")
			.replace(/&&+/g, "&");
	}
}
