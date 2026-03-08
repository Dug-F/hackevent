import { NextRequest, NextResponse } from 'next/server'
import payload from 'payload'
import crypto from 'crypto'

function normaliseRegistration(reg: string) {
  return reg.toUpperCase().replace(/\s+/g, '')
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function POST(request: NextRequest) {
  try {

    // ---------------------------------------
    // correlation id
    // ---------------------------------------

    const correlationId =
      request.headers.get('X-Correlation-Id') ?? crypto.randomUUID()

    // ---------------------------------------
    // simulator behaviour overrides
    // ---------------------------------------

    const simulatedDelay = request.headers.get('x-simulated-delay')
    const simulatedError = request.headers.get('x-simulated-error')

    if (simulatedDelay) {
      const delayMs = Number(simulatedDelay)
      if (!Number.isNaN(delayMs)) {
        await sleep(delayMs)
      }
    }

    if (simulatedError) {

      const status = Number(simulatedError)

      return NextResponse.json(
        {
          errors: [
            {
              status: String(status),
              title: 'Simulated API error',
              detail: 'Error triggered via x-simulated-error header',
            },
          ],
        },
        {
          status: status || 500,
          headers: { 'X-Correlation-Id': correlationId },
        }
      )
    }

    // ---------------------------------------
    // api key validation
    // ---------------------------------------

    const apiKey = request.headers.get('x-api-key')

    if (!apiKey) {
      return NextResponse.json(
        {
          errors: [
            {
              status: '400',
              code: 'API_KEY_MISSING',
              title: 'API key missing',
              detail: 'x-api-key header is required',
            },
          ],
        },
        {
          status: 400,
          headers: { 'X-Correlation-Id': correlationId },
        }
      )
    }

    const apiKeyResult = await payload.find({
      collection: 'api-keys',
      where: {
        apiKey: { equals: apiKey },
        active: { equals: true },
      },
    })

    if (apiKeyResult.totalDocs === 0) {
      return NextResponse.json(
        {
          errors: [
            {
              status: '401',
              code: 'INVALID_API_KEY',
              title: 'Invalid API key',
            },
          ],
        },
        {
          status: 401,
          headers: { 'X-Correlation-Id': correlationId },
        }
      )
    }

    // ---------------------------------------
    // read body
    // ---------------------------------------

    const body = await request.json()

    const registration = body?.registrationNumber

    if (!registration) {
      return NextResponse.json(
        {
          errors: [
            {
              status: '400',
              code: '105',
              title: 'Invalid vrn number',
              detail: 'registrationNumber is required',
            },
          ],
        },
        {
          status: 400,
          headers: { 'X-Correlation-Id': correlationId },
        }
      )
    }

    const normalisedRegistration = normaliseRegistration(registration)

    // ---------------------------------------
    // vehicle lookup
    // ---------------------------------------

    const vehicleResult = await payload.find({
      collection: 'vehicles',
      where: {
        registrationNumber: {
          equals: normalisedRegistration,
        },
      },
    })

    if (vehicleResult.totalDocs === 0) {
      return NextResponse.json(
        {
          errors: [
            {
              status: '404',
              code: 'NOT_FOUND',
              title: 'Vehicle Not Found',
            },
          ],
        },
        {
          status: 404,
          headers: { 'X-Correlation-Id': correlationId },
        }
      )
    }

    const vehicle = vehicleResult.docs[0]

    return NextResponse.json(vehicle, {
      status: 200,
      headers: {
        'X-Correlation-Id': correlationId,
      },
    })

  } catch (err) {

    const correlationId = crypto.randomUUID()

    return NextResponse.json(
      {
        errors: [
          {
            status: '500',
            code: 'SERVER_ERROR',
            title: 'Internal Server Error',
          },
        ],
      },
      {
        status: 500,
        headers: { 'X-Correlation-Id': correlationId },
      }
    )
  }
}