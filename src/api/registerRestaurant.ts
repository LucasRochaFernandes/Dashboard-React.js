import { api } from '@/lib/axios'

interface registerRestaurantBody {
  restaurantName: string
  managerName: string
  phone: string
  email: string
}

export async function registerRestaurant({
  email,
  phone,
  managerName,
  restaurantName,
}: registerRestaurantBody) {
  await api.post('/restaurants', { email, phone, managerName, restaurantName })
}
