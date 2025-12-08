import { imageUrl } from '@/lib/assets';
import React from 'react';

export default function AppLogoIcon(props: React.ImgHTMLAttributes<HTMLImageElement>) {
    return <img src={imageUrl('kristalinlogotransisi1.png')} alt="Kristalin Eka Lestari Logo" {...props} />;
}
