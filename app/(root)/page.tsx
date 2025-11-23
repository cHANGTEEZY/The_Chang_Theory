import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, PenTool, Globe } from "lucide-react"

const HomePage = () => {
    return (
        <section className="flex flex-col min-h-screen bg-background">
            <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24 md:py-32">
                <div className="max-w-3xl space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground text-balance">
                            The Change Theory
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance max-w-2xl mx-auto">
                            Discover the latest trends in science, technology, and beyond. A space to explore, read, and share your
                            voice with the world.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                        <Button asChild size="lg" className="rounded-full text-base px-8 h-12">
                            <Link href="/dashboard">
                                Explore Now <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            <section className="py-24 md:py-32 px-4 border-t border-border/40">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16 space-y-3">
                        <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance">Why Join The Change Theory?</h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Everything you need to share your ideas and connect with a community of thinkers
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="group relative overflow-hidden rounded-2xl p-8 md:p-10 bg-background transition-all duration-300 hover:shadow-lg border border-border/40 hover:border-border/80 hover:bg-card/50">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative space-y-4">
                                <div className="inline-flex items-center justify-center p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                                    <BookOpen className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground">Discover Topics</h3>
                                <p className="text-muted-foreground leading-relaxed text-sm">
                                    Dive into a wide range of categories from tech trends to scientific breakthroughs.
                                </p>
                            </div>
                        </div>

                        <div className="group relative overflow-hidden rounded-2xl p-8 md:p-10 bg-background transition-all duration-300 hover:shadow-lg border border-border/40 hover:border-border/80 hover:bg-card/50">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative space-y-4">
                                <div className="inline-flex items-center justify-center p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                                    <PenTool className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground">Share Your Voice</h3>
                                <p className="text-muted-foreground leading-relaxed text-sm">
                                    Create and publish your own blogs. Share your insights and theories with a growing community.
                                </p>
                            </div>
                        </div>

                        <div className="group relative overflow-hidden rounded-2xl p-8 md:p-10 bg-background transition-all duration-300 hover:shadow-lg border border-border/40 hover:border-border/80 hover:bg-card/50">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative space-y-4">
                                <div className="inline-flex items-center justify-center p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                                    <Globe className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground">Connect Globally</h3>
                                <p className="text-muted-foreground leading-relaxed text-sm">
                                    Engage with readers and writers from around the world. Expand your perspective.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 md:py-32 px-4 border-t border-border/40">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <div className="space-y-3">
                        <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance">
                            Ready to start your journey?
                        </h2>
                        <p className="text-lg text-muted-foreground text-balance">
                            Join The Change Theory today and become part of the conversation.
                        </p>
                    </div>
                    <Button asChild size="lg" className="rounded-full text-base px-8 h-12 inline-flex">
                        <Link href="/dashboard">
                            Get Started <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </section>
        </section>
    )
}

export default HomePage
