import Link from "next/link";

export default function OldHome() {
  return (
    <div className="hero min-h-[calc(100vh-64px)] bg-base-100">
      <div className="hero-content text-center">
        <div className="max-w-2xl">
          <div className="badge badge-primary badge-outline gap-2 mb-6">
            🔐 Secure Authentication
          </div>
          <h1 className="text-5xl font-bold leading-tight">
            Next-Gen{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Auth System
            </span>
            <br />
            Built for Scale
          </h1>
          <p className="py-6 text-base-content/70 text-lg max-w-lg mx-auto">
            Production-ready authentication and role-based authorization
            powered by Next.js, NextAuth.js, Prisma, and PostgreSQL.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/register" className="btn btn-primary btn-lg">
              Get Started Free
            </Link>
            <Link href="/login" className="btn btn-outline btn-lg">
              Sign In →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { icon: "🔑", label: "JWT Sessions" },
              { icon: "🛡️", label: "Role-Based Access" },
              { icon: "🔒", label: "Bcrypt Hashing" },
              { icon: "⚡", label: "Edge Middleware" },
            ].map((feature) => (
              <div key={feature.label} className="card bg-base-200 p-4">
                <div className="text-2xl mb-1">{feature.icon}</div>
                <div className="text-sm font-medium">{feature.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
