import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const TESTIMONIALS = [
  {
    name: "Ahmad Rizki",
    role: "Fresh Graduate Teknik",
    avatar: "/api/placeholder/60/60",
    testimonial:
      "Sebelumnya selalu gagal di tahap interview. Setelah latihan dengan InterviewAI, akhirnya lolos di perusahaan teknologi impian. Feedback yang diberikan sangat membantu!",
    rating: 5,
    initials: "AR",
  },
  {
    name: "Maya Putri",
    role: "Career Switcher",
    avatar: "/api/placeholder/60/60",
    testimonial:
      "Pindah karir ke bidang baru membuat saya gugup saat interview. InterviewAI membantu saya mempersiapkan diri dengan pertanyaan yang relevan dan feedback yang konstruktif.",
    rating: 4.5,
    initials: "MP",
  },
  {
    name: "Dimas Pratama",
    role: "Mahasiswa Tingkat Akhir",
    avatar: "/api/placeholder/60/60",
    testimonial:
      "Sebagai mahasiswa tingkat akhir, InterviewAI sangat membantu saya mempersiapkan diri untuk magang. Berkat latihan intensif, saya berhasil mendapatkan posisi magang impian!",
    rating: 5,
    initials: "DP",
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex gap-1">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar
          key={index}
          className="h-5 w-5 fill-yellow-400 text-yellow-400"
        />
      ))}
      {hasHalfStar && (
        <FaStarHalfAlt className="h-5 w-5 fill-yellow-400 text-yellow-400" />
      )}
    </div>
  );
};

export function HomeTestimonialsView() {
  return (
    <section className="flex items-center justify-center overflow-hidden bg-gray-50 font-sans dark:bg-gray-900">
      <div className="container flex w-full flex-col items-center justify-center gap-8 px-6 py-24 md:px-0 md:py-30">
        <div className="max-w-3xl space-y-4 text-center">
          <h2 className="clamp-[text,2xl,4xl] font-bold text-gray-900 dark:text-white">
            Apa Kata Pengguna Kami
          </h2>
          <p className="clamp-[text,sm,lg] mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
            Pengalaman nyata dari mereka yang telah berlatih dengan InterviewAI
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <Card
              key={index}
              className="border-0 bg-white p-6 shadow-2xs transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 flex-shrink-0">
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                    <AvatarFallback className="bg-gray-200 font-semibold text-gray-700 dark:bg-gray-600 dark:text-gray-300">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  &quot;{testimonial.testimonial}&quot;
                </p>

                <div className="flex items-center gap-2">
                  <StarRating rating={testimonial.rating} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
