import Image from "next/image";
import { ClassType } from "./ClassList";
import { useRouter } from "next/navigation";
import FavoriteButton from "../FavoriteButton";

interface ClassProps {
    classItem: ClassType,
    markFavorite?: (is_favorite: boolean) => void;
}

const ClassListItem: React.FC<ClassProps> = ({
    classItem,
    markFavorite
}) => {
    const router = useRouter();

    return (
        <div
            className="cursor-pointer"
            onClick={() => router.push(`/classes/${classItem.id}`)} // Navigate to class detail page on click
        >
            <div className="relative overflow-hidden aspect-square rounded-xl">
                <Image
                    fill
                    src={classItem.image_url}
                    sizes="(max-width: 768px) 768px, (max-width: 1200px): 768px, 768px"
                    className="hover:scale-110 object-cover transition h-full w-full"
                    alt={classItem.title}
                />

                {/* Favorite button(on progress), shown only if markFavorite is provided */}
                {markFavorite && (
                    <FavoriteButton
                        id={classItem.id}
                        is_favorite={classItem.is_favorite}
                        markFavorite={(is_favorite) => markFavorite(is_favorite)}
                    />
                )}
            </div>

            <div className="mt-2">
                <p className="text-lg font-bold">{classItem.title}</p>
            </div>

            <div className="mt-2">
                <p className="text-sm text-gray-500">Description <strong>{classItem.description}</strong></p>
                <p className="text-sm text-gray-500">Duration <strong>{classItem.duration_in_minutes} minutes</strong></p>
                <p className="text-sm text-gray-500"><strong>${classItem.price_per_session}</strong> per session</p>
            </div>
        </div>
    )
}

export default ClassListItem;
