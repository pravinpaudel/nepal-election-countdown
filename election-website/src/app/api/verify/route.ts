import { NextRequest, NextResponse } from "next/server";
import { SubscriberService } from "../../../services/subscriberService";

const subscriberService = new SubscriberService();
 
/**
 * Verify subscriber email using token
 *
 * @param {NextRequest} request - The incoming HTTP request object.
 * @returns {NextResponse} A JSON response indicating success or error.
 * 
 * @example
 * // Request
 * GET /api/verify?token=xxxxxx
 * 
 * // Successful Response
 * {
 *   "message": "Subscriber verified successfully"
 * }
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const token = searchParams.get("token");

        if (!token) {
            return NextResponse.json(
                { error: "Verification token is required" },
                { status: 400 }
            );
        }

        const result = await subscriberService.verify(token);
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error("❌ Verify API Error:", error);

        if (error instanceof Error) {
            if (error.message === "Verification token is required" || 
                error.message === "Invalid or expired verification token") {
                return NextResponse.json(
                    { error: error.message },
                    { status: 400 }
                );
            }
        }

        return NextResponse.json(
            { error: "Server error during verification" },
            { status: 500 }
        );
    }
}