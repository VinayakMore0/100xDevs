async function render() {
  document.getElementById("form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const idInput = document.querySelector("#id");
    const id = idInput.value.trim();

    if (!id) {
      alert("Please enter an id!");
      return;
    }

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);

        // Extract lists
        const abilities = data.abilities.map((a) => a.ability.name).join(", ");
        const moves = data.moves
          .slice(0, 5)
          .map((m) => m.move.name)
          .join(", "); // limit to 5
        const stats = data.stats
          .map((s) => `${s.stat.name}: ${s.base_stat}`)
          .join("<br>");
        const types = data.types.map((t) => t.type.name).join(", ");

        document.getElementById("main").innerHTML = `
          <div id="card">
              <div id="info">
                  <p>#${data.id} ${data.name}</p>
                  <img src="${data.sprites.front_default}" alt="${data.name}">
                  <p><strong>Height:</strong> ${data.height}' | <strong>Weight:</strong> ${data.weight} lbs</p>
                  <p><strong>Base Exp:</strong> ${data.base_experience} | <strong>Order:</strong> ${data.order}</p>
                  <p><strong>Abilities:</strong> ${abilities}</p>
                  <p><strong>Moves:</strong> ${moves}</p>
                  <p><strong>Stats:</strong><br>${stats}</p>
                  <p><strong>Types:</strong> ${types}</p>
              </div>
          </div>
        `;
      } else {
        alert("Pokemon not found!");
      }
    } catch (error) {
      console.error(error);
    }
  });
}

render();
