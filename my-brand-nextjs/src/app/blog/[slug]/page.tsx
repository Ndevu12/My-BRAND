import { Metadata } from 'next';
import Typography from '@/components/atoms/Typography';
import Card from '@/components/molecules/Card';

export const metadata: Metadata = {
    title: 'Blog Post | MY-BRAND',
    description: 'Read insightful articles on software engineering, AI, ML, Cloud Native, IoT, and Pan-Africanism.',
};

export default function BlogDetailPage() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-white">
            <section className="w-full max-w-2xl">
                <Card>
                    <header className="mb-6">
                        <Typography variant="h1" className="text-3xl font-bold text-brand-primary mb-2">
                            Blog Title Placeholder
                        </Typography>
                        <Typography variant="small" className="text-sm text-gray-500">
                            By Author Name • June 2024
                        </Typography>
                    </header>
                    <article>
                        <Typography variant="p" className="text-base text-gray-700 leading-relaxed">
                            This is a placeholder for the blog post content. Here you will find insightful articles about software engineering, AI, ML, Cloud Native, IoT, and Pan-Africanism. Stay tuned for more updates!
                        </Typography>
                    </article>
                </Card>
            </section>
        </main>
    );
}