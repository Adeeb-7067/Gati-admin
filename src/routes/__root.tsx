import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { UiPreferencesProvider } from "@/contexts/ui-preferences-context";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "GATI Admin · Logistics Platform" },
      { name: "description", content: "GATI Admin — manage users, drivers, orders and operations." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=JSON.parse(localStorage.getItem("gati-ui-preferences")||"{}");var r=document.documentElement;var colors={violet:["oklch(0.56 0.24 285)","oklch(0.955 0.04 285)"],blue:["oklch(0.55 0.20 250)","oklch(0.955 0.04 250)"],teal:["oklch(0.58 0.14 185)","oklch(0.955 0.04 185)"],green:["oklch(0.58 0.17 152)","oklch(0.955 0.04 152)"],orange:["oklch(0.68 0.18 55)","oklch(0.955 0.04 55)"],rose:["oklch(0.58 0.22 15)","oklch(0.955 0.04 15)"]};var c=p.primaryColor==="custom"&&p.customPrimaryHex?[p.customPrimaryHex,p.customPrimaryHex]:colors[p.primaryColor]||colors.violet;r.style.setProperty("--primary",c[0]);r.style.setProperty("--ring",c[0]);if(p.textSize)r.dataset.textSize=p.textSize;if(p.radius)r.dataset.radius=p.radius;if(p.density)r.dataset.density=p.density;if(p.sidebarCompact)r.dataset.sidebarCompact="true",r.style.setProperty("--sidebar-width","76px");if(p.reducedMotion)r.dataset.reducedMotion="true";var t=p.theme||"light";if(t==="dark"||(t==="system"&&matchMedia("(prefers-color-scheme:dark)").matches))r.classList.add("dark");}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <UiPreferencesProvider>
        <Outlet />
        <Toaster richColors position="top-right" />
      </UiPreferencesProvider>
    </QueryClientProvider>
  );
}
