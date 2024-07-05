import Image from "next/image";
import Link from "next/link";
import apiService from "@/app/services/apiService";
import { getUserId } from "@/app/lib/actions";

const ClassDetailPage = async ({ params }: { params: { id: string } }) => {
    const classItem = await apiService.get(`/api/classes/${params.id}`);
    const userId = await getUserId();

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <div className="w-full h-[64vh] mb-4 overflow-hidden rounded-xl relative">
                <Image
                    fill
                    src={classItem.image_url}
                    className="object-cover w-full h-full"
                    alt={classItem.title}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="py-6 pr-6 col-span-3">
                    <h1 className="mb-4 text-4xl">{classItem.title}</h1>

                    <span className="mb-6 block text-lg text-gray-600">
                        {classItem.max_students} students - {classItem.duration_in_minutes} minutes
                    </span>

                    <hr />

                    <Link href={`/professors/${classItem.professor.id}`} className="py-6 flex items-center space-x-4">
                        {classItem.professor.avatar_url && (
                            <Image
                                src={classItem.professor.avatar_url}
                                width={50}
                                height={50}
                                className="rounded-full"
                                alt="The user name"
                            />
                        )}

                        <p><strong>{classItem.professor.name}</strong> is your professor</p>
                    </Link>

                    <hr />

                    <p className="mt-6 text-lg">
                        {classItem.description}
                    </p>

                    {classItem.video_url && (
                        <Link href={`/videoclass/${classItem.id}`}>
                            <span className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg">
                                Watch Video
                            </span>
                        </Link>
                    )}
                </div>
            </div>
        </main>
    );
};

export default ClassDetailPage;