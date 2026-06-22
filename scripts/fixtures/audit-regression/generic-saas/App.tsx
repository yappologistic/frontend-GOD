export function App() {
  return (
    <main>
      <section className="bg-gradient-to-br rounded-2xl rounded-2xl rounded-2xl rounded-2xl rounded-2xl rounded-2xl">
        <h1>Everything you need in one place</h1>
        <p>Boost productivity with our powerful platform. Built for modern teams that want to move faster and save time.</p>
        <a>Get started</a>
        <a>Learn more</a>
      </section>

      <button><SparklesIcon /></button>
      <div onClick={() => alert("open")}>Open panel</div>
      <img src="/hero.png" />

      <Card><Icon /><Title>Plan</Title><Description>Simple and powerful.</Description></Card>
      <Card><Icon /><Title>Track</Title><Description>Insights at a glance.</Description></Card>
      <Card><Icon /><Title>Grow</Title><Description>Make better decisions.</Description></Card>
    </main>
  );
}
