import { NextRequest, NextResponse } from "next/server";
import { SubscriberService } from "../../../services/subscriberService";

const subscriberService = new SubscriberService();

/**
 * To handle unsubscribe requests
 * @param request 
 * @returns A JSON response indicating success or failure along with a message
 * 
 * @example
 * // Request
 * POST /api/unsubscribe
 * {
 *   "email": "<user_email>"
 * }        
 */
export async function POST(request: NextRequest) {
    const { email } = await request.json();

    try{
        if (!email || typeof email !== "string") {
            return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
        }

        const result = await subscriberService.unsubscribe(email);
        // return the result from the service so callers can inspect message/success
        return NextResponse.json(result, { status: 200 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("❌ Error unsubscribing:", message);
        return NextResponse.json({ success: false, message }, { status: 500 });
    }
    
}