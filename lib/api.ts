import { Persona, Auto, Reserva } from "./types"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8999/api"

// === AUTH ===
export async function login(username: string, password: string) {
  try {
    const res = await fetch(`${NEXT_API_URL}/api/auth/persona/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: username, password }),
    })

    if (!res.ok) return null
    return res.json()
  } catch (err) {
    console.error("Login error:", err)
    return null
  }
}

// === HELPER ===
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  })

  if (!res.ok) {
    throw new Error(`Error fetching ${endpoint}: ${res.statusText}`)
  }

  // Handle empty responses (like DELETE)
  if (res.status === 204) {
    return {} as T
  }

  return res.json()
}

const NEXT_API_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

// === PERSONAS ===
export async function getPersonas(): Promise<Persona[]> {
  const res = await fetch(`${NEXT_API_URL}/api/personas`, { cache: 'no-store' });
  if (!res.ok) throw new Error("Error fetching personas");
  return res.json();
}

export async function getPersonaById(id: number): Promise<Persona | null> {
  try {
    const res = await fetch(`${NEXT_API_URL}/api/personas/${id}`);
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    return null
  }
}

export async function createPersona(persona: Omit<Persona, "id">): Promise<Persona> {
  const res = await fetch(`${NEXT_API_URL}/api/personas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(persona),
  })
  if (!res.ok) throw new Error("Error creating persona");
  return res.json();
}

export async function updatePersona(id: number, persona: Partial<Persona>): Promise<Persona> {
  const res = await fetch(`${NEXT_API_URL}/api/personas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(persona),
  })
  if (!res.ok) throw new Error("Error updating persona");
  return res.json();
}

export async function deletePersona(id: number): Promise<void> {
  const res = await fetch(`${NEXT_API_URL}/api/personas/${id}`, {
    method: "DELETE",
  })
  if (!res.ok) throw new Error("Error deleting persona");
}

// === AUTOS ===
export async function getAutos(): Promise<Auto[]> {
  try {
    const res = await fetch(`${NEXT_API_URL}/api/autos`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Error fetching autos");
    return res.json();
  } catch (error) {
    console.error("Error fetching autos:", error)
    return []
  }
}

export async function getAutoById(id: number): Promise<Auto | null> {
  try {
    const res = await fetch(`${NEXT_API_URL}/api/autos/${id}`);
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    return null
  }
}

export async function createAuto(auto: Omit<Auto, "id">): Promise<Auto> {
  const res = await fetch(`${NEXT_API_URL}/api/autos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(auto),
  })
  if (!res.ok) throw new Error("Error creating auto");
  return res.json();
}

export async function updateAuto(id: number, auto: Partial<Auto>): Promise<Auto> {
  const res = await fetch(`${NEXT_API_URL}/api/autos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(auto),
  })
  if (!res.ok) throw new Error("Error updating auto");
  return res.json();
}

export async function deleteAuto(id: number): Promise<void> {
  const res = await fetch(`${NEXT_API_URL}/api/autos/${id}`, {
    method: "DELETE",
  })
  if (!res.ok) throw new Error("Error deleting auto");
}

// === RESERVAS ===
export async function getReservas(): Promise<Reserva[]> {
  try {
    const res = await fetch(`${NEXT_API_URL}/api/reservas`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Error fetching reservas");
    return res.json();
  } catch (error) {
    console.error("Error fetching reservas:", error)
    return []
  }
}

export async function createReserva(reserva: Omit<Reserva, "id">): Promise<Reserva> {
  const res = await fetch(`${NEXT_API_URL}/api/reservas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reserva),
  })
  if (!res.ok) throw new Error("Error creating reserva")
  return res.json()
}

export async function updateReserva(id: number, reserva: Partial<Reserva>): Promise<Reserva> {
  const res = await fetch(`${NEXT_API_URL}/api/reservas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reserva),
  })
  if (!res.ok) throw new Error("Error updating reserva")
  return res.json()
}

export async function deleteReserva(id: number): Promise<void> {
  const res = await fetch(`${NEXT_API_URL}/api/reservas/${id}`, {
    method: "DELETE",
  })
  if (!res.ok) throw new Error("Error deleting reserva")
}

// ...

export async function getReservasPersona(personaId: number): Promise<Reserva[]> {
  try {
    const res = await fetch(`${NEXT_API_URL}/api/reservas?personaId=${personaId}`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Error fetching persona reservas");
    return res.json();
  } catch (error) {
    console.error("Error fetching persona reservas:", error)
    return []
  }
}

// === AUTH PERSONA ===
export async function loginPersona(credentials: { email: string; password: string }) {
  // Use local Next.js API route instead of Java backend
  const res = await fetch(`/api/auth/persona/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  })
  if (!res.ok) throw new Error("Credenciales inválidas")
  return res.json()
}

export async function registerPersona(persona: any) {
  // Use local Next.js API route instead of Java backend
  const res = await fetch(`/api/auth/persona/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(persona),
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(err || "Error registrando persona")
  }
  return res.json()
}

// === FOOTER ===
export async function getFooterData() {
  try {
    const res = await fetch(`${NEXT_API_URL}/api/footer`, { cache: 'no-store' });
    if (!res.ok) return []
    return res.json()
  } catch (e) {
    return []
  }
}

export async function updateFooterData(key: string, value: string) {
  const res = await fetch(`${NEXT_API_URL}/api/footer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ keyName: key, value }),
  })
  if (!res.ok) throw new Error("Error actualizando footer")
  return res.json()
}
