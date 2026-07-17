const API_BASE = process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}`

export interface AddToCartPayload {
  carId: string
  quantity?: number
}

export interface AddToCartResponse {
  success: boolean
  data?: {
    insertedId: string
    item: {
      userId: string
      carId: string
      quantity: number
      createdAt: string
    }
  }
  error?: string
}

export async function addToCart(
  payload: AddToCartPayload,
  token: string
): Promise<AddToCartResponse> {
  try {
    const res = await fetch(`${API_BASE}/api/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })

    const data = await res.json()

    if (!res.ok) {
      return { success: false, error: data.error || "Failed to add item to cart" }
    }

    return data
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Network error",
    }
  }
}
