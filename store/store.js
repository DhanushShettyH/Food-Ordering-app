import create from 'zustand'


export const useStore = create(
    (set) => ({

        //cart state to store list of pizzas
        cart: {
            pizzas: []
        },

        //adding pizza in cart function
        addPizza: (data) =>
            set((state) => ({
                cart: {
                    pizzas: [...state.cart.pizzas, data]
                }
            })),

        // remove pizza
        removePizza: (index) =>
            set((state) => ({
                cart: {
                    //here _ (means each pizza i index ) not equal to given index return that
                    pizzas: state.cart.pizzas.filter((_, i) => i != index)
                }
            })),

            resetCart:()=>
            set(()=>({
                cart:{
                    pizzas:[]
                }
            }))
    })
)
