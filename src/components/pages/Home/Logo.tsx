import MetallicPaint, { parseLogoImage } from "@/components/shared/reactBit/MetallicPaint.tsx";
import { useState, useEffect } from 'react';

// replace with your own SVG
// NOTE: your SVG should have a bit of padding around the shape, to keep it from being cut off
// it should also have black fill color, to allow the metallic effect to show through the mask
import boyCatHatBoard from "/image/avatar/boyCatHatBoard.webp";

export default function Logo() {
    const [imageData, setImageData] = useState<ImageData | null>(null);

    useEffect(() => {
        async function loadDefaultImage() {
            try {
                const response = await fetch(boyCatHatBoard);
                const blob = await response.blob();
                const file = new File([blob], "/image/avatar/boyCatHatBoard.webp", { type: blob.type });

                const parsedData = await parseLogoImage(file);
                setImageData(parsedData?.imageData ?? null);

            } catch (err) {
                console.error("Error loading default image:", err);
            }
        }

        loadDefaultImage();
    }, []);

    return (
        <div style={{ width: '100%', height: '100vh' }} className="z-50 relative" >
            <MetallicPaint
                imageData={imageData ?? new ImageData(1, 1)}
                params={{ edge: 2, patternBlur: 0.005, patternScale: 2, refraction: 0.015, speed: 0.3, liquid: 0.07 }}
            />
        </div>
    );
}