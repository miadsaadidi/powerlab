import { NextResponse } from "next/server";
import { normalizeSolarRequest, requestPvWatts, type SolarProductionRequest } from "@/lib/providers/pvwatts";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json() as Partial<SolarProductionRequest>;
    const input: SolarProductionRequest = {
      latitude: Number(body.latitude),
      longitude: Number(body.longitude),
      systemCapacityKw: Number(body.systemCapacityKw),
      tiltDeg: Number(body.tiltDeg),
      azimuthDeg: Number(body.azimuthDeg),
      moduleType: Number(body.moduleType) as SolarProductionRequest["moduleType"],
      arrayType: Number(body.arrayType) as SolarProductionRequest["arrayType"],
      lossesPercent: Number(body.lossesPercent),
      dcAcRatio: Number(body.dcAcRatio),
      inverterEfficiencyPercent: Number(body.inverterEfficiencyPercent),
    };
    normalizeSolarRequest(input);
    return NextResponse.json(await requestPvWatts(input));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Solar production modeling is unavailable.";
    const status = /must be|greater than|between|incomplete/.test(message) ? 400 : 503;
    return NextResponse.json({ error: message }, { status });
  }
}
