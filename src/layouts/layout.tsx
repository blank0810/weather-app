import type { PropsWithChildren } from "react";
import Header from "@/layouts/header";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-gradient-to-br from-background to-muted">
      <Header />
      <main className="min-h-screen container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="border-t backdrop-blur py-4 supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Ehnand A. All rights reserved.</p>
          <p>
            For inquiries or more information, reach out at{" "}
            <a href="mailto:ehnand.azucena00@gmail.com" className="text-blue-600 font-medium hover:underline">
              ehnand.azucena00@gmail.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
};

export default Layout