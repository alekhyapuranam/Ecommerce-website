import { render, screen, within } from "@testing-library/react"
import axios from "axios"
import { MemoryRouter } from "react-router"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { HomePage } from "./Homepage"
vi.mock('axios')
describe('test components of homepage', ()=>{
    let checkoutItems=[];
    let setCheckoutItems=vi.fn();
    let loadCartItems=vi.fn();
    beforeEach(()=>{
        axios.get.mockImplementation(async (urlPath)=>{
            if(urlPath==='api/products'){
                return (
                    {data : [{
                id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                image: "images/products/athletic-cotton-socks-6-pairs.jpg",
                name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                rating: {
                    stars: 4.5,
                    count: 87
                },
                priceCents: 1090,
                keywords: ["socks", "sports", "apparel"]
            },
            {
                id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                image: "images/products/intermediate-composite-basketball.jpg",
                name: "Intermediate Size Basketball",
                rating: {
                    stars: 4,
                    count: 127
                },
                priceCents: 2095,
                keywords: ["sports", "basketballs"]
            }
                    
                        
                    ]}
                )
            }

        })

    })
    it('test page rendering',async()=>{
        
        render(
        <MemoryRouter>
        <HomePage checkoutItems={checkoutItems} setCheckoutItems={setCheckoutItems} loadCartItems={loadCartItems}/>
    </MemoryRouter>
        )
    let container=await screen.findByTestId("test-container");
    let productContainer = within(container).getAllByTestId("product-test-container");
    
        expect(productContainer.length).toBe(2);
       // let product1=screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs")
        expect(productContainer[0]).toHaveTextContent("Black and Gray Athletic Cotton Socks - 6 Pairs");
        expect(productContainer[1]).toHaveTextContent("Intermediate Size Basketball");
    
    })
})