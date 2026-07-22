import { imageUrl } from '@/lib/assets';

export default function AppLogo() {
    return <img src={imageUrl('kristalin-logo-v2.png')} alt="Kristalin Eka Lestari Logo" className="h-10 w-auto object-contain" />;
}
