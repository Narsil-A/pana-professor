import Image from "next/image";
import Link from "next/link";
import apiService from "@/app/services/apiService";
import CircularProgress from "@/app/components/CircularProgress";
import EditClassButton from "@/app/components/EditClassButton";
import { ClassItem } from "@/app/types/ClassItem";

const calculateProgress = (classItem: ClassItem): number => {
    const fields = [
        classItem.category,
        classItem.title,
        classItem.description,
        classItem.price_per_session,
        classItem.duration_in_minutes,
        classItem.max_students,
        classItem.subject,
        classItem.image_url,
        classItem.video_url,
    ];
    const filledFields = fields.filter(Boolean).length;
    return Math.round((filledFields / fields.length) * 100);
};

const ClassDetailPage = async ({ params }: { params: { id: string } }) => {
    const classItem: ClassItem = await apiService.get(`/api/classes/${params.id}`);
    const progress = calculateProgress(classItem);

    return (
        <main className="max-w-[900px] mx-auto px-6 pb-6">
            <div className="flex justify-center w-full max-w-[700px] h-auto max-h-[500px] overflow-hidden rounded-xl relative mx-auto">
                <Image
                    src={classItem.image_url}
                    alt={classItem.title}
                    width={300}
                    height={300}
                    objectFit="contain"
                    className="flex rounded-xl border border-red-500"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border border-red-500 ml-4">
                <div className="md:col-span-2 py-6 pr-6">
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
                        <p>
                            <strong>{classItem.professor.name}</strong> is your professor
                        </p>
                    </Link>
                    <hr />
                    <p className="mt-6 text-lg">{classItem.description}</p>
                    {classItem.video_url && (
                        <Link href={`/videoclass/${classItem.id}`}>
                            <span className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg">
                                Watch Video
                            </span>
                        </Link>
                    )}
                    <div className="py-3 pr-6 pl-6">
                        <EditClassButton classId={params.id} />
                    </div>
                </div>
                <div className="md:col-span-1 flex justify-center items-center border border-red-500">
                    <div className="py-6 pr-6 pl-6">
                        <h2 className="mb-4 text-2xl text-center">Class Data Progress</h2>
                        <CircularProgress
                            percentage={progress}
                            text={`${progress}%`}
                            size={200}
                            strokeWidth={18}
                            color="#047857"
                            trailColor="#d6d6d6"
                            gradient={["#14b8a6", "#5eead4"]}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ClassDetailPage;





