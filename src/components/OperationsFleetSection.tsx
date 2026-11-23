import { useMemo, useState } from 'react';
import { Compass } from 'lucide-react';
import { geoGraticule, geoMercator, geoPath } from 'd3-geo';
import type { FeatureCollection, Geometry } from 'geojson';
import seaMapRaw from '../data/seaMapFeatures.json';
import { OPERATIONAL_HUBS } from '../data/companyProfile';
import type { OperationalHub, PrefillQuotePayload } from '../types/company';

interface OperationsFleetSectionProps {
  onSelectRegionQuote?: (payload: Omit<PrefillQuotePayload, 'requestId'>) => void;
}

type MapScope = 'indonesia' | 'eastern';

const HEAD_OFFICE_COORDS: [number, number] = [106.68, -6.3];

interface SupplyRoute {
  id: string;
  targetHubIds: string[];
  from: [number, number];
  to: [number, number];
  isLongHaul?: boolean;
}

const SUPPLY_ROUTES: SupplyRoute[] = [
  {
    id: 'route-hq-mks',
    targetHubIds: ['hub-makassar', 'hub-kendari', 'hub-sulteng', 'hub-malut', 'hub-sorong'],
    from: HEAD_OFFICE_COORDS,
    to: [119.43, -5.14],
    isLongHaul: true,
  },
  {
    id: 'route-mks-kdi',
    targetHubIds: ['hub-kendari', 'hub-sulteng', 'hub-malut', 'hub-sorong'],
    from: [119.43, -5.14],
    to: [122.51, -3.99],
  },
  {
    id: 'route-kdi-mrw',
    targetHubIds: ['hub-sulteng'],
    from: [122.51, -3.99],
    to: [121.95, -2.68],
  },
  {
    id: 'route-kdi-mlt',
    targetHubIds: ['hub-malut', 'hub-sorong'],
    from: [122.51, -3.99],
    to: [128.45, 0.35],
  },
  {
    id: 'route-mlt-srq',
    targetHubIds: ['hub-sorong'],
    from: [128.45, 0.35],
    to: [131.26, -0.87],
  },
];

const MAP_WIDTH = 960;
const MAP_HEIGHT = 430;

export function OperationsFleetSection(_props: OperationsFleetSectionProps) {
  const [selectedHubId, setSelectedHubId] = useState<string>(OPERATIONAL_HUBS[1].id);
  const [hoveredHubId, setHoveredHubId] = useState<string | null>(null);
  const [mapScope, setMapScope] = useState<MapScope>('indonesia');

  const activeHub: OperationalHub =
    OPERATIONAL_HUBS.find((h) => h.id === selectedHubId) ?? OPERATIONAL_HUBS[0];

  const hoveredHub: OperationalHub | null =
    OPERATIONAL_HUBS.find((h) => h.id === hoveredHubId) ?? null;

  const { landFeatures, graticulePath, projection, pathGenerator } = useMemo(() => {
    const collection = seaMapRaw as unknown as FeatureCollection<Geometry>;

    const proj =
      mapScope === 'indonesia'
        ? geoMercator()
            .center([117.5, -2.2])
            .scale(1140)
            .translate([MAP_WIDTH / 2, MAP_HEIGHT / 2 + 10])
        : geoMercator()
            .center([125.0, -2.1])
            .scale(2250)
            .translate([MAP_WIDTH / 2, MAP_HEIGHT / 2 + 14]);

    const generator = geoPath(proj);
    const graticule = geoGraticule().step([5, 5])();

    return {
      landFeatures: collection.features,
      graticulePath: generator(graticule) ?? '',
      projection: proj,
      pathGenerator: generator,
    };
  }, [mapScope]);

  const headOfficePoint = projection(HEAD_OFFICE_COORDS);
  const hoveredPoint = hoveredHub ? projection(hoveredHub.geoCoords) : null;

  const buildCurvedArc = (from: [number, number], to: [number, number]): string | null => {
    const p1 = projection(from);
    const p2 = projection(to);
    if (!p1 || !p2) return null;
    const mx = (p1[0] + p2[0]) / 2;
    const my = (p1[1] + p2[1]) / 2;
    const dx = p2[0] - p1[0];
    const dy = p2[1] - p1[1];
    const dist = Math.hypot(dx, dy);
    const curveOffset = Math.min(36, dist * 0.16);
    const cx = mx;
    const cy = my - curveOffset;
    return `M ${p1[0].toFixed(1)} ${p1[1].toFixed(1)} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  };

  return (
    <section
      id="operasional"
      className="border-b border-[#223029] bg-[#0B100E] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-[#24332B] bg-[#121915] p-5 text-white sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#223029] pb-4">
            <div className="flex items-center gap-2.5">
              <Compass className="h-5 w-5 text-[#9BD447]" aria-hidden="true" />
              <h2 className="font-display text-lg font-bold text-white sm:text-xl">
                Peta Koridor Distribusi Nasional
              </h2>
            </div>

            <div
              role="group"
              aria-label="Mode tampilan peta"
              className="inline-flex rounded-lg border border-[#26352E] bg-[#0C120F] p-1"
            >
              <button
                type="button"
                onClick={() => setMapScope('indonesia')}
                aria-pressed={mapScope === 'indonesia'}
                className={`rounded-md px-3 py-1.5 text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                  mapScope === 'indonesia'
                    ? 'bg-[#8CC63F] text-[#0B1206]'
                    : 'text-[#B8C7BF] hover:text-white'
                }`}
              >
                Seluruh Indonesia
              </button>
              <button
                type="button"
                onClick={() => setMapScope('eastern')}
                aria-pressed={mapScope === 'eastern'}
                className={`rounded-md px-3 py-1.5 text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                  mapScope === 'eastern'
                    ? 'bg-[#8CC63F] text-[#0B1206]'
                    : 'text-[#B8C7BF] hover:text-white'
                }`}
              >
                Fokus Koridor Timur
              </button>
            </div>
          </div>

          {/* Geographically Accurate Interactive SVG Cartography */}
          <div className="relative mt-5 overflow-hidden rounded-lg border border-[#24332B] bg-[#080D0B]">
            <svg
              viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
              role="img"
              aria-label="Peta geografis jaringan distribusi BBM industri PT. GTR Energi Nusantara"
              className="h-auto w-full select-none"
            >
              <defs>
                <radialGradient id="oceanGlow" cx="62%" cy="48%" r="60%">
                  <stop offset="0%" stopColor="#13221B" />
                  <stop offset="100%" stopColor="#070C0A" />
                </radialGradient>
              </defs>

              <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="url(#oceanGlow)" />

              {/* 5-degree Lat/Lng Graticule */}
              <path
                d={graticulePath}
                fill="none"
                stroke="#2B3D33"
                strokeOpacity={0.4}
                strokeWidth={0.75}
                strokeDasharray="2 4"
              />

              {/* Neighboring landmasses + Indonesia */}
              <g>
                {landFeatures.map((feature, index) => {
                  const isIndonesia = String(feature.id) === '360';
                  const d = pathGenerator(feature) ?? '';
                  return (
                    <path
                      key={`${String(feature.id ?? 'feat')}-${index}`}
                      d={d}
                      fill={isIndonesia ? '#1F3A28' : '#111A15'}
                      stroke={isIndonesia ? '#8CC63F' : '#223029'}
                      strokeOpacity={isIndonesia ? 0.55 : 0.8}
                      strokeWidth={isIndonesia ? 0.95 : 0.7}
                    />
                  );
                })}
              </g>

              {/* Dynamic Geodesic Supply Corridor Arcs */}
              <g>
                {SUPPLY_ROUTES.map((route) => {
                  const arcPath = buildCurvedArc(route.from, route.to);
                  if (!arcPath) return null;
                  const isActivePath = route.targetHubIds.includes(activeHub.id);
                  return (
                    <path
                      key={route.id}
                      d={arcPath}
                      fill="none"
                      stroke={
                        isActivePath
                          ? '#9BD447'
                          : route.isLongHaul
                          ? '#EAB308'
                          : '#8CC63F'
                      }
                      strokeWidth={isActivePath ? 2.4 : 1.2}
                      strokeDasharray={route.isLongHaul ? '4 4' : '6 3'}
                      strokeOpacity={isActivePath ? 1 : 0.35}
                    />
                  );
                })}
              </g>

              {/* Head Office Marker (only visible in full Indonesia view) */}
              {mapScope === 'indonesia' && headOfficePoint && (
                <g transform={`translate(${headOfficePoint[0]}, ${headOfficePoint[1]})`}>
                  <rect
                    x={-4.5}
                    y={-4.5}
                    width={9}
                    height={9}
                    rx={2}
                    fill="#EF4444"
                    stroke="#080D0B"
                    strokeWidth={1.5}
                  />
                  <text
                    x={0}
                    y={-11}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="600"
                    fill="#E5ECE8"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                  >
                    Head Office (Tangsel)
                  </text>
                </g>
              )}

              {/* Clickable & Hoverable Hub Pins */}
              {OPERATIONAL_HUBS.map((hub) => {
                const pt = projection(hub.geoCoords);
                if (!pt) return null;
                const isSelected = hub.id === activeHub.id;
                const isHovered = hub.id === hoveredHubId;

                const labelConfig =
                  hub.id === 'hub-makassar'
                    ? { dx: -12, dy: 16, anchor: 'end' as const }
                    : hub.id === 'hub-kendari'
                    ? { dx: 12, dy: 15, anchor: 'start' as const }
                    : hub.id === 'hub-sulteng'
                    ? { dx: 12, dy: -10, anchor: 'start' as const }
                    : hub.id === 'hub-malut'
                    ? { dx: 0, dy: -16, anchor: 'middle' as const }
                    : { dx: 12, dy: 4, anchor: 'start' as const };

                return (
                  <g
                    key={hub.id}
                    transform={`translate(${pt[0]}, ${pt[1]})`}
                    onClick={() => setSelectedHubId(hub.id)}
                    onMouseEnter={() => setHoveredHubId(hub.id)}
                    onMouseLeave={() => setHoveredHubId(null)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Pilih titik ${hub.province} (${hub.city})`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedHubId(hub.id);
                      }
                    }}
                    className="cursor-pointer focus:outline-none"
                  >
                    {(isSelected || isHovered) && (
                      <circle
                        r={isSelected ? 16 : 12}
                        fill="#8CC63F"
                        fillOpacity={isSelected ? 0.24 : 0.16}
                        stroke="#9BD447"
                        strokeWidth={1.25}
                      />
                    )}
                    <circle
                      r={isSelected ? 7 : isHovered ? 6 : 5}
                      fill={isSelected ? '#8CC63F' : '#F59E0B'}
                      stroke="#080D0B"
                      strokeWidth={2}
                    />
                    <text
                      x={labelConfig.dx}
                      y={labelConfig.dy}
                      textAnchor={labelConfig.anchor}
                      fontSize={isSelected ? '11.5' : '10.5'}
                      fontWeight={isSelected ? '700' : '600'}
                      fill={isSelected ? '#FFFFFF' : '#CBD7D1'}
                      fontFamily="Plus Jakarta Sans, sans-serif"
                    >
                      {hub.city.split(' / ')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Floating Map Hover Readout */}
            {hoveredHub && hoveredPoint && (
              <div className="pointer-events-none absolute top-3 left-3 rounded-lg border border-[#2C3E34] bg-[#0B100E]/95 px-3 py-2 text-xs shadow-md">
                <p className="font-semibold text-[#9BD447]">{hoveredHub.province}</p>
                <p className="font-display font-bold text-white">{hoveredHub.city}</p>
                <p className="font-mono text-[11px] text-[#F59E0B] tabular-nums">
                  {hoveredHub.coordLabel}
                </p>
              </div>
            )}
          </div>

          {/* Interactive Hub Selection Tabs for Route Highlighting */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div
              role="tablist"
              aria-label="Sorot koridor wilayah pada peta"
              className="flex flex-wrap gap-2"
            >
              {OPERATIONAL_HUBS.map((hub) => {
                const isSelected = hub.id === activeHub.id;
                return (
                  <button
                    key={hub.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedHubId(hub.id)}
                    className={`min-h-10 shrink-0 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-bold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8CC63F] ${
                      isSelected
                        ? 'bg-[#8CC63F] text-[#0B1206]'
                        : 'border border-[#2B3B33] bg-[#161F1B] text-[#D2DDD7] hover:border-[#8CC63F]/60 hover:text-white'
                    }`}
                  >
                    {hub.province}
                  </button>
                );
              })}
            </div>

            <span className="font-mono text-xs text-[#9FB0A8] tabular-nums">
              5 Titik Koridor Timur · 1 Head Office
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
