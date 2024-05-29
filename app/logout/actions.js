'use server'

export async function logout() {
    const supabase = createClient()
  
    const { error } = await supabase.auth.signOut()
  
    if (error) {
      redirect("/error")
    }
  
    revalidatePath("/", "layout")
    redirect("/")
  }
  