import React from 'react'

const Contact = () => {
    
  return (
    <>
    <div className='pt-20 container mx-auto'>
        <h1 className='text-primary font-bold text-5xl'>How can we help you?</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 pt-20">
            <div className="flex flex-col bg-white p-3 border border-gray-200 shadow-lg rounded-lg">
                <h1 className="text-lg font-bold text-grade tracking-wide mb-2">
                    What payment methods do you accept?
                </h1>
                <p className="text-secondary text-md mb-3">
                    We accept major credit and debit cards (Visa, MasterCard, American Express), Paystack, and other secure payment methods.
                </p>

                <h1 className="text-lg font-bold text-grade  tracking-wide mb-2">
                    How do I track my order?
                </h1>
                <p className="text-secondary text-md mb-3">
                    Once your order is shipped, you will receive a tracking number via email. You can use this number on our website or the carrier’s website to track your package.
                </p>
                <h1 className="text-lg font-bold text-grade  tracking-wide mb-2">
                    What is your return policy?
                </h1>
                <p className="text-secondary text-md mb-3">
                    We offer a 30-day return policy for most items. Items must be in new condition with all original packaging and accessories. Please visit our Returns page for detailed instructions.
                </p>
            </div>
            <div className="flex flex-col bg-white p-3 border border-gray-200 shadow-lg rounded-lg">
                <h1 className="text-lg font-bold text-grade  tracking-wide mb-2">
                    Do you offer international shipping?
                </h1>
                <p className="text-secondary text-md mb-3">
                    Yes, we offer international shipping to many countries. Shipping costs and delivery times may vary depending on the destination. Please contact us for more information if your country is not listed during checkout.
                </p>

                <h1 className="text-lg font-bold text-grade  tracking-wide mb-2">
                    Are your products covered by warranty?
                </h1>
                <p className="text-secondary text-md mb-3">
                    Yes, all our products come with a manufacturer's warranty. Warranty terms vary by product and manufacturer. Please refer to the product description or contact us for specific warranty information.
                </p>
                <h1 className="text-lg font-bold text-grade  tracking-wide mb-2">
                    Can I customize my gaming PC/laptop configuration?
                </h1>
                <p className="text-secondary text-md mb-3">
                    Yes, we offer customization options for many of our gaming PCs and laptops. You can often choose components such as CPU, GPU, RAM, storage, and more. Look for customization options on the product page or contact our sales team for assistance.
                </p>
            </div>
            <div className="flex flex-col bg-white p-3 border border-gray-200 shadow-lg rounded-lg">
                <h1 className="text-lg font-bold text-grade  tracking-wide mb-2">
                    Do you provide technical support for your products?
                </h1>
                <p className="text-secondary text-md mb-3">
                    Yes, we provide technical support for products purchased from our store. Contact our support team via email or phone for assistance with setup, troubleshooting, or general inquiries.
                </p>

                <h1 className="text-lg font-bold text-grade  tracking-wide mb-2">
                    How secure is shopping on your website?
                </h1>
                <p className="text-secondary text-md mb-3">
                    We take security seriously and use industry-standard encryption technology (SSL) to protect your personal information during the checkout process. Your payment details are securely handled by trusted payment gateways.
                </p>
                <h1 className="text-lg font-bold text-grade  tracking-wide mb-2">
                    Can I cancel my order?
                </h1>
                <p className="text-secondary text-md mb-3">
                    You can cancel your order before it is shipped. Please contact us immediately if you wish to cancel your order. Once shipped, you may need to follow our return policy for a refund.
                </p>
            </div>
            <div className="flex flex-col bg-white p-3 border border-gray-200 shadow-lg rounded-lg">
                <h1 className="text-lg font-bold text-grade  tracking-wide mb-2">
                    How can I contact customer support?
                </h1>
                <p className="text-secondary text-md mb-3">
                    You can reach our customer support team via email at support@mjstechnology.co.ke or by phone at +254 701 650457. Our support hours are MON-SAT (0800-1700)Hrs.
                </p>

                <h1 className="text-lg font-bold text-grade  tracking-wide mb-2">
                    Are the products on your site genuine and brand new?
                </h1>
                <p className="text-secondary text-md mb-3">
                    Yes, we only sell brand new and genuine products sourced directly from authorized distributors and manufacturers.
                </p>
                <h1 className="text-lg font-bold text-grade tracking-wide mb-2">
                    What should I do if my product arrives damaged or defective?
                </h1>
                <p className="text-secondary text-md mb-3">
                    In the rare event that your product arrives damaged or defective, please contact our customer support team immediately. We will arrange for a replacement or return according to our return policy.
                </p>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-5">
            <div className="flex flex-col">
                <h1 className="text-xl text-dark mb-2 tracking-wide font-bold">Not what you were looking for ?</h1>
                <p className="text-md text-secondary">Browse through tall of our Help Center articles</p>
            </div>
            <div className="mt-5">
                <button className="bg-grade text-white hover:bg-red-300 w-full py-3 rounded-full">Get In Touch</button>
            </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-7 pt-20'>
        <div class="flex flex-col">
            <h1 class="text-2xl font-bold text-dark mb-4">Points of Contact</h1>
           <h2 class="text-xl font-bold tracking-wide mb-3">Mj's Technology Kenya</h2>
           <p class="text-md font-medium tracking-wide mb-3">Moi Avenue Nairobi, Kenya, Veteran house 6th floor office, Room no. 610 next to Bihi Towers near The Bazaar</p>
           <h2 class="text-xl font-bold text-dark mb-2">Information & Sales</h2>
           <p class="text-md font-medium tracking-wide mb-3">support@mjstechnology.co.ke</p>
        </div>
        <div className="pt-10 md:pt-0">
        <h1 className=" text-4xl font-bold">Get In Touch.</h1>
        <form
          className='mt-12 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className='font-medium mb-4'>Your Name</span>
            <input
              type='text'
              name='name'
              placeholder="What's your good name?"
              className='bg-gray-300 border border-white shadow py-4 px-6 placeholder:text-secondary text-primary rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='font-medium mb-4'>Your email</span>
            <input
              type='email'
              name='email'
              placeholder="What's your web address?"
              className='bg-gray-300 border border-white shadow py-4 px-6 placeholder:text-secondary text-primary rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='font-medium mb-4'>Your Message</span>
            <textarea
              rows={7}
              name='message'
              placeholder='What you want to say?'
              className='bg-gray-300 border border-white shadow py-4 px-6 placeholder:text-secondary text-primary rounded-lg outline-none border-none font-medium'
            />
          </label>

          <button
            type='submit'
            className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'
          >
            {"Send"}
          </button>
        </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default Contact