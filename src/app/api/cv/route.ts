import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import axios from "axios";
import { jsPDF } from "jspdf";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data } = await axios.get(
      "https://api-impactx.brilliahib.tech/api/auth/get-profile",
      {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      },
    );

    const user = data.data;
    const profile = user.profile;

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    let y = 20;

    if (profile.profile_images) {
      try {
        const imageUrl = profile.profile_images.startsWith("http")
          ? profile.profile_images
          : `https://api-impactx.brilliahib.tech/storage/${profile.profile_images}`;

        const imgRes = await axios.get(imageUrl, {
          responseType: "arraybuffer",
        });
        const imgData = Buffer.from(imgRes.data, "binary").toString("base64");
        doc.addImage(
          `data:image/jpeg;base64,${imgData}`,
          "JPEG",
          160,
          15,
          30,
          30,
        );
      } catch (err) {
        console.warn("⚠️ Gagal memuat foto profil");
      }
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(0);
    doc.text(`${user.first_name} ${user.last_name}`.trim(), 20, y);
    y += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(13);
    doc.setTextColor(80);
    doc.text(`${profile.role ?? "Professional"}`, 20, y);
    y += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(100);

    const contactInfo = [...(profile.contact_info || [])].filter(Boolean);
    if (contactInfo.length > 0) {
      let contactX = 20;
      contactInfo.forEach((info: string, index: number) => {
        doc.text(info, contactX, y);
        contactX += doc.getTextWidth(info) + 10;
      });
      y += 10;
    } else {
      y += 5;
    }

    doc.setFont("helvetica", "medium");
    doc.setFontSize(13);
    doc.setTextColor(30);
    doc.text("About", 20, y);
    y += 7;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(70);
    const aboutLines = doc.splitTextToSize(
      profile.about_description ?? "-",
      170,
    );
    doc.text(aboutLines, 20, y);
    y += aboutLines.length * 5 + 10;

    doc.setFont("helvetica", "medium");
    doc.setFontSize(13);
    doc.setTextColor(30);
    doc.text("Skills", 20, y);
    y += 7;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(70);
    const skillsText = profile.skills?.length ? profile.skills.join(", ") : "-";
    const skillsLines = doc.splitTextToSize(skillsText, 170);
    doc.text(skillsLines, 20, y);
    y += skillsLines.length * 5 + 10;

    doc.setFont("helvetica", "medium");
    doc.setFontSize(13);
    doc.setTextColor(30);
    doc.text("Education", 20, y);
    y += 7;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(70);
    doc.text(`${profile.university ?? "-"} — ${profile.major ?? "-"}`, 20, y);
    y += 10;

    doc.setFontSize(9);
    doc.setTextColor(150);
    doc.text("Generated automatically from ImpactX Profile", 20, 290);

    const pdf = doc.output("arraybuffer");

    const safeFirst = (user.first_name || "").replace(/\s+/g, "");
    const safeLast = (user.last_name || "").replace(/\s+/g, "");
    const fileName = `${safeFirst}${safeLast} - Portfolio.pdf`;

    return new NextResponse(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to generate CV" },
      { status: 500 },
    );
  }
}
