import { ImageResponse } from 'next/og';
import { siteConfig } from '@/config/site';

export const runtime = 'edge';

export const alt = 'JNTUH Results - TheSkypedia';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

type Props = {
    params: Promise<{
        regulation: string;
        sem: string;
    }>;
};

// Map URL semantics to readable titles (consistent with page.tsx)
const formatRegulation = (reg: string) => reg.toUpperCase();
const formatSemester = (sem: string) => `B.Tech ${sem.replace('-', '-')} Semester`;

export default async function ResultOGImage({ params }: Props) {
    const { regulation, sem } = await params;
    const regTitle = formatRegulation(regulation);
    const semTitle = formatSemester(sem);

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `linear-gradient(to bottom right, #1C61E7, #0F3D99)`,
                    color: 'white',
                    padding: '40px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '24px',
                        padding: '60px 80px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
                    }}
                >
                    {/* Brand Name */}
                    <div style={{ fontSize: 32, fontWeight: 'bold', opacity: 0.9, marginBottom: 20 }}>
                        {siteConfig.name}
                    </div>

                    {/* Main Title */}
                    <div
                        style={{
                            fontSize: 80,
                            fontWeight: 900,
                            textAlign: 'center',
                            lineHeight: 1.1,
                            marginBottom: 20,
                            textShadow: '0 4px 12px rgba(0,0,0,0.3)',
                            display: 'flex', // Flex is needed for wrapping text in satori
                            flexDirection: 'column',
                        }}
                    >
                        <span>{regTitle}</span>
                        <span>{semTitle}</span>
                    </div>

                    {/* Subtitle */}
                    <div
                        style={{
                            fontSize: 40,
                            fontWeight: 'normal',
                            opacity: 0.8,
                            marginTop: 10,
                            background: 'white',
                            color: '#1C61E7',
                            padding: '10px 30px',
                            borderRadius: '50px',
                        }}
                    >
                        Check Results Instantly
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
