javascript: (() => { const gridElement = document.createElement('div'); gridElement.id = 'esc-grid'; const columnThreeNames = []; const columnFourNames = []; const frequency = {}; let greatestFrequency = 0; rollData.TraitCombos .filter((combo) => combo.Show) .sort((b,a) => (  rollData.ItemDefs.Item.RandomRolls[2].findIndex((t) => t.ItemHash == a.Perk4Hash) -   rollData.ItemDefs.Item.RandomRolls[2].findIndex((t) => t.ItemHash == b.Perk4Hash)  ) * 100 + (  rollData.ItemDefs.Item.RandomRolls[3].findIndex((t) => t.ItemHash == a.Perk5Hash) -   rollData.ItemDefs.Item.RandomRolls[3].findIndex((t) => t.ItemHash == b.Perk5Hash)  ) ).forEach((combo) => {  const threeName = rollData.ItemDefs.Item.RandomRolls[2].find((t) => t.ItemHash == combo.Perk4Hash).Name;  const fourName = rollData.ItemDefs.Item.RandomRolls[3].find((t) => t.ItemHash == combo.Perk5Hash).Name;  if (!columnThreeNames.includes(threeName)) columnThreeNames.push(threeName);  if (!columnFourNames.includes(fourName)) columnFourNames.push(fourName);  if (!frequency[threeName]) frequency[threeName] = {};  frequency[threeName][fourName] = combo.Count;  greatestFrequency = Math.max(greatestFrequency, combo.Count); }); for (let i = 0; i <= columnThreeNames.length; i++) { for (let j = 0; j <= columnFourNames.length; j++) {  const columnThreeName = columnThreeNames[i-1] || '';  const columnFourName = columnFourNames[j-1] || '';  const comboFrequency = (frequency[columnThreeName] || {})[columnFourName] || 0;  const cellElement = document.createElement('div');  cellElement.className = 'esc-cell';  cellElement.style.backgroundColor = `rgba(82, 163, 71, ${comboFrequency / greatestFrequency})`;  if (i === 0 && j === 0) {  cellElement.textContent = '';  } else if (i === 0) {  cellElement.textContent = columnFourName;  cellElement.style.borderBottom = '0.5px solid black';  } else if (j === 0) {  cellElement.textContent = columnThreeName;  cellElement.style.borderRight = '0.5px solid black';  } else {  cellElement.textContent = comboFrequency;  }  gridElement.appendChild(cellElement); } } const targetElement = document.getElementById('main-column'); targetElement.prepend(gridElement); const style = document.createElement('style'); style.innerHTML = ` #esc-grid { display: grid; grid-template-columns: repeat(${columnThreeNames.length+1}, 1fr); background-color: white; } .esc-cell { color: black; padding: 3px; } `; document.head.appendChild(style);})();

(() => {
    const gridElement = document.createElement('div');
    gridElement.id = 'esc-grid';

    const columnThreeNames = [];
    const columnFourNames = [];
    const frequency = {};
    let greatestFrequency = 0;

    rollData.TraitCombos
        .filter((combo) => combo.Show)
        .sort((b,a) => (
                rollData.ItemDefs.Item.RandomRolls[2].findIndex((t) => t.ItemHash == a.Perk4Hash) - 
                rollData.ItemDefs.Item.RandomRolls[2].findIndex((t) => t.ItemHash == b.Perk4Hash)
            ) * 100 + (
                rollData.ItemDefs.Item.RandomRolls[3].findIndex((t) => t.ItemHash == a.Perk5Hash) - 
                rollData.ItemDefs.Item.RandomRolls[3].findIndex((t) => t.ItemHash == b.Perk5Hash)
            )
        ).forEach((combo) => {
            const threeName = rollData.ItemDefs.Item.RandomRolls[2].find((t) => t.ItemHash == combo.Perk4Hash).Name;
            const fourName = rollData.ItemDefs.Item.RandomRolls[3].find((t) => t.ItemHash == combo.Perk5Hash).Name;

            if (!columnThreeNames.includes(threeName)) columnThreeNames.push(threeName);
            if (!columnFourNames.includes(fourName)) columnFourNames.push(fourName);

            if (!frequency[threeName]) frequency[threeName] = {};
            frequency[threeName][fourName] = combo.Count;
            greatestFrequency = Math.max(greatestFrequency, combo.Count);
        });

    for (let i = 0; i <= columnThreeNames.length; i++) {
        for (let j = 0; j <= columnFourNames.length; j++) {
            const columnThreeName = columnThreeNames[i-1] || '';
            const columnFourName = columnFourNames[j-1] || '';
            const comboFrequency = (frequency[columnThreeName] || {})[columnFourName] || 0;
            const cellElement = document.createElement('div');
            cellElement.className = 'esc-cell';
            cellElement.style.backgroundColor = `rgba(82, 163, 71, ${comboFrequency / greatestFrequency})`;
            if (i === 0 && j === 0) {
                cellElement.textContent = '';
            } else if (i === 0) {
                cellElement.textContent = columnFourName;
                cellElement.style.borderBottom = '0.5px solid black';
            } else if (j === 0) {
                cellElement.textContent = columnThreeName;
                cellElement.style.borderRight = '0.5px solid black';
            } else {
                cellElement.textContent = comboFrequency;
            }
            gridElement.appendChild(cellElement);
        }
    }
    const targetElement = document.getElementById('main-column');
    targetElement.prepend(gridElement);

    const style = document.createElement('style');

    style.innerHTML = `
    #esc-grid {
        display: grid;
        grid-template-columns: repeat(${columnThreeNames.length+1}, 1fr);
        background-color: white;
    }

    .esc-cell {
        color: black;
        padding: 3px;
    }
    `;
    document.head.appendChild(style);
})();