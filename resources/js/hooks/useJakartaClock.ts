import { useEffect, useState } from 'react';

const JAKARTA_TZ = 'Asia/Jakarta';

function localeTag(siteLocale: string): string {
    if (siteLocale === 'id') return 'id-ID';
    if (siteLocale === 'zh') return 'zh-CN';
    return 'en-GB';
}

export function useJakartaClock(siteLocale: string) {
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        const tick = () => setNow(new Date());
        tick();
        const id = window.setInterval(tick, 1000);
        return () => window.clearInterval(id);
    }, []);

    const tag = localeTag(siteLocale);

    const date = new Intl.DateTimeFormat(tag, {
        timeZone: JAKARTA_TZ,
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    }).format(now);

    const timeRaw = new Intl.DateTimeFormat('id-ID', {
        timeZone: JAKARTA_TZ,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    }).format(now);

    return {
        date,
        time: `${timeRaw} WIB`,
        zone: JAKARTA_TZ,
    };
}
