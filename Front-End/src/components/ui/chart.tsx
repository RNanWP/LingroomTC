"use client";

import * as React from "react";
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useMemo,
} from "react";
import {
  Area,
  Bar,
  Line,
  Pie,
  RadialBar,
  Scatter,
  type AreaProps,
  type BarProps,
  type LineProps,
  type PieProps,
  type RadialBarProps,
  type ScatterProps,
} from "recharts";
import { cn } from "@/lib/utils"; // Supondo que você tenha este utilitário do shadcn

//
// CONTEXTO E TIPOS DO GRÁFICO (O CORAÇÃO DA CORREÇÃO)
//

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = createContext<ChartContextProps | null>(null);

function useChart() {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer>");
  }
  return context;
}

const ChartContainer = forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ComponentProps<
      typeof RechartsResponsiveContainer
    >["children"];
  }
>(({ config, className, children, ...props }, ref) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        ref={ref}
        {...props}
        className={cn(
          "flex aspect-video items-center justify-center gap-4 [&>div]:h-full [&>div]:w-full",
          className
        )}
      >
        <RechartsResponsiveContainer>{children}</RechartsResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "Chart";

// ... (Restante dos componentes base como ChartLegend, ChartTooltip, etc.)
// O código abaixo é uma implementação padrão do shadcn/ui.
// Se você não tiver, pode adicionar, mas o importante é a estrutura acima.

// Exemplo simples de como o restante do arquivo poderia ser
// (Se você tiver mais código de ChartTooltip, etc., mantenha-o,
// desde que não cause a importação circular)

import { ResponsiveContainer as RechartsResponsiveContainer } from "recharts";

export const ChartTooltipContent = forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-lg border bg-background p-2 shadow-sm", className)}
    {...props}
  />
));
ChartTooltipContent.displayName = "ChartTooltipContent";

export type ChartConfig = {
  [key in string]: {
    label?: React.ReactNode;
    color?: string;
    icon?: React.ComponentType;
  };
};

// Exportações Finais
export { ChartContainer, useChart };
