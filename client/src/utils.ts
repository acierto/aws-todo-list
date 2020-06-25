class Utils {
    public static uuid(): string {
        let i;
        let uuid = '';

        for (i = 0; i < 32; i++) {
            // tslint:disable-next-line:no-bitwise
            const random = Math.random() * 16 | 0;
            if (i === 8 || i === 12 || i === 16 || i === 20) {
                uuid += '-';
            }
            // tslint:disable-next-line:no-bitwise
            uuid += (i === 12 ? 4 : (i === 16 ? ((random & 3) | 8) : random))
                .toString(16);
        }

        return uuid;
    }

    public static pluralize(count: number, word: string) {
        return count === 1 ? word : word + 's';
    }

    public static store(namespace: string, data?: any) {
        if (data) {
            return localStorage.setItem(namespace, JSON.stringify(data));
        }

        const store = localStorage.getItem(namespace);
        return (store && JSON.parse(store)) || [];
    }
}

export {Utils};
