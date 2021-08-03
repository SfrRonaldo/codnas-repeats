import Section1 from './Section1'
import Section2 from './Section2'
import Section3 from './Section3'

const Information = () => {
  return (
    <section className="md:pl-72">
      <div className="space-y-12">
        <Section1 />
        <Section2 />
        <Section3 />
      </div>
    </section>
  )
}

export default Information
