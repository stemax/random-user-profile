import { useEffect, useRef } from "react";

const words = [
    "firstName",
    "lastName",
    "fullName",
    "username",
    "email",
    "phone",
    "address",
    "password",
    "gender",
    "age",
    "height",
    "weight",
    "profession",
    "bio",
    "creditCard",
    "avatar",
    "country",
];

export const BackgroundWords = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const items = words.map((word) => ({
            text: word,
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            dx: (Math.random() - 0.5) * 0.5,
            dy: (Math.random() - 0.5) * 0.5,
            size: 14 + Math.random() * 100,
        }));

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "rgba(241,241,248,0.3)";
            ctx.font = "16px monospace";

            items.forEach((item) => {
                ctx.font = `${item.size}px monospace`;
                ctx.fillText(item.text, item.x, item.y);

                item.x += item.dx;
                item.y += item.dy;

                if (item.x < 0 || item.x > canvas.width - 50) item.dx *= -1;
                if (item.y < 0 || item.y > canvas.height - 20) item.dy *= -1;
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-10"
            style={{ background: "radial-gradient(circle at top, #e1e6f1, #8d8e95)" }}
        />
    );
};
