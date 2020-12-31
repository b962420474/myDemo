
export default {
    template: `<div>
    <h2>Dashboard</h2>
    <p>Yay you made it!</p>
  </div>`,
  created(){
    console.log("dashboard created.....");
  },
  beforeDestroy(){
    console.log("dashboard beforeDestroy.....");
  },
}