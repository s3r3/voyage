"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

interface AvatarHotel {
  id: string;
  name: string;
  image: string;
  flag: string;
  username: string;
  testimonial: string;
}

const AvatarHotels: React.FC = () => {
  const [avatars, setAvatars] = useState<AvatarHotel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const res = await fetch("/api/avatar");
        const data = await res.json();
        setAvatars(data);
      } catch (err) {
        console.error("Failed to fetch offers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAvatar();
  }, []);

  return (
    <div className="w-full py-16 relative">
      <div className="absolute inset-0">
      <Image
          src="/beach.jpg"
          alt="Beach Background"
          objectFit="cover"
          className="w-full h-[700px]"
          width={1440}
          height={964}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-12 text-white drop-shadow">
          What Our Guests Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-20">
          {avatars.map((avatar) => (
            <div
              key={avatar.id}
              className="bg-white rounded-lg p-6 shadow-lg flex flex-col items-center text-center"
            >
              <div
                className="w-24 h-24 relative -mt-20 mb-4 border-4 border-white rounded-full overflow-hidden"
              >
                <Image
                  src={avatar.image}
                  alt={avatar.name}
                  layout="fill"
                  objectFit="cover"
                    className="rounded-full object-cover"
                  />
                </div>
              <p className="mt-2 text-sm font-medium text-gray-800">
                {avatar.name}
              </p>
              <h3 className="text-xl font-semibold mt-1 mb-2 text-gray-900">
                {avatar.username}
              </h3>
              <p className="text-gray-600">
                {avatar.testimonial}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvatarHotels;