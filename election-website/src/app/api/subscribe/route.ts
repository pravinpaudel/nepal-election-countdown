import { NextRequest, NextResponse } from "next/server";
import { SubscriberService } from "../../../services/subscriberService";

const subscriberService = new SubscriberService();

/**
 * POST /api/subscribe
 * 
 * Add new subscriber with email verification flow
 * 
 * Request Body:
 * {
 *   "email": "user@example.com"
 * }
 * 
 * Response:
 * - 200: Subscription initiated (check email for verification)
 * - 400: Invalid email format or already subscribed
 * - 500: Server error
 */
export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email || typeof email !== "string") {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        const result = await subscriberService.subscribe(email);

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error("❌ Subscribe API Error:", error);

        // Known error messages from service layer
        if (error instanceof Error) {
            if (error.message === "Invalid email format" || 
                error.message === "This email is already subscribed to our updates") {
                return NextResponse.json(
                    { error: error.message },
                    { status: 400 }
                );
            }
        }

        // Prisma unique constraint error
        if (error && typeof error === "object" && "code" in error && error.code === "P2002") {
            return NextResponse.json(
                {
                    error: "This email is already in our system",
                    message: "Please check your inbox for the verification email.",
                },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                error: "Failed to process subscription",
                message: "An unexpected error occurred. Please try again later.",
            },
            { status: 500 }
        );
    }
}

/**
 * GET /api/subscribe
 * 
 * Health check endpoint
 */
export async function GET() {
    return NextResponse.json(
        {
            endpoint: "/api/subscribe",
            method: "POST",
            description: "Subscribe to Nepal Election updates",
            requiredFields: ["email"],
        },
        { status: 200 }
    );
}
