import Image from "next/image";

export default function Home() {
  return (
    <div className="container">
      <video autoPlay muted loop playsInline id="bg-video">
        <source src="/videos/pink-flower.mp4" type="video/mp4" />
        <Image src="/images/fallback-image.png" alt="Video not supported" width={414} height={736} />
      </video>
      {/* Content page 1 */}
      <div className="content">
        <p>The Wedding Of</p>
        <p style={{ paddingTop: 64 }}>Num</p>
        <p>&</p>
        <p>Art</p>
        <p style={{ paddingTop: 64 }}>We Invite You To Celebrate Our Wedding</p>
        <p style={{ paddingTop: 64 }}>Saturday</p>
        <p style={{ paddingTop: 64 }}>15 - March- 2025</p>
      </div>
      {/* Content page 2 */}
      <div className="content">
        <p style={{ paddingTop: 64 }}>The Wedding Of</p>
        <p style={{ paddingTop: 64 }}>Num</p>
        <p>&</p>
        <p>Art</p>
        <p style={{ paddingTop: 64 }}>We Invite You To Celebrate Our Wedding</p>
        <p style={{ paddingTop: 64 }}>Saturday</p>
        <p style={{ paddingTop: 64 }}>15 - March- 2025</p>
      </div>
    </div>
  );
}
