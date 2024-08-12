function HomePage() {
  return (
    <section className="h-[calc(100vh-7rem)] flex justify-center items-center">
    <div>
      <h1 className="text-white text-5xl">HOME</h1>
    </div>
  </section>
  )
}

export default HomePage

// https://www.youtube.com/watch?v=iZDK42F2cTc
// https://www.prisma.io/docs/getting-started?_gl=1*19yglcv*_up*MQ..&gclid=Cj0KCQjwwae1BhC_ARIsAK4JfrzvO5XYIztrbt1FOXrhlQafhtkHOLDiIY6u2vptiluCg9oSZS1j65QaAmkqEALw_wcB
// https://react-hook-form.com/
// https://www.npmjs.com/package/bcrypt
// https://next-auth.js.org/getting-started/example

// como obtener secret
// node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"