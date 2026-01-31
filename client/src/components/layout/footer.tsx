import Link from 'next/link'

export function Footer() {
    return (
        <footer className="border-t border-[rgba(255,255,255,0.05)] bg-surface-base py-12">
            <div className="mx-auto max-w-7xl px-6 flex flex-col items-center justify-between gap-6 md:flex-row">
                <p className="text-sm text-white/40">
                    © 2026 Wanderify. <span className="hidden sm:inline">Built on Polygon.</span>
                </p>

                <div className="flex gap-8">
                    <Link href="/terms" className="text-sm text-white/40 hover:text-accent-primary transition-colors">
                        Terms
                    </Link>
                    <Link href="/privacy" className="text-sm text-white/40 hover:text-accent-primary transition-colors">
                        Privacy
                    </Link>
                    <Link href="https://github.com/wanderify" target="_blank" className="text-sm text-white/40 hover:text-accent-primary transition-colors">
                        GitHub
                    </Link>
                </div>
            </div>
        </footer>
    )
}
