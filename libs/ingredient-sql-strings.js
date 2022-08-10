export const meatsSql = `LOWER(name) NOT LIKE '%beef%' AND LOWER(name) NOT LIKE '%chicken%' AND LOWER(name) NOT LIKE '%duck%' AND LOWER(name) NOT LIKE '%bacon%' AND LOWER(name) NOT LIKE '% meat%' 
AND LOWER(name) NOT LIKE '%sausage%' AND LOWER(name) NOT LIKE '%steak%' AND LOWER(name) NOT LIKE '%pork%' AND LOWER(name) NOT LIKE '%chorizo%' AND LOWER(name) NOT LIKE '%lamb%' 
AND LOWER(name) NOT LIKE '%ham%' AND LOWER(name) NOT LIKE '%liver%' AND LOWER(name) NOT LIKE '%salami%' AND LOWER(name) NOT LIKE '%pepperoni%' AND LOWER(name) NOT LIKE '%turkey%'
`;

export const fishSql = `LOWER(name) NOT LIKE '%cod%' AND LOWER(name) NOT LIKE '%haddock%' AND NOT LOWER(name) NOT LIKE '%fish%' AND LOWER(name) NOT LIKE '%salmon%' 
AND LOWER(name) NOT LIKE '%tuna%' AND LOWER(name) NOT LIKE '%trout%' AND LOWER(name) NOT LIKE '%mackerel%' AND LOWER(name) NOT LIKE '%sardine%' 
AND LOWER(name) NOT LIKE '%scampi%' AND LOWER(name) NOT LIKE '%squid%' AND LOWER(name) NOT LIKE '%calamari%'
`;

export const shellfishSql = `LOWER(name) NOT LIKE '%prawn%' AND LOWER(name) NOT LIKE '%shrimp%' AND LOWER(name) NOT LIKE '%mussel%' AND LOWER(name) NOT LIKE '%scallop%' 
AND LOWER(name) NOT LIKE '%clam%'`

export const dairySql = `((LOWER(name) LIKE '%coconut%' OR LOWER(name) LIKE '%soy%' OR LOWER(name) LIKE '%almond%') OR (LOWER(name) NOT LIKE '%milk%' AND LOWER(name) NOT LIKE '%cheese%' AND LOWER(name) NOT LIKE '%yoghurt%' 
AND LOWER(name) NOT LIKE '%butter%' AND LOWER(name) NOT LIKE '%cream' AND LOWER(name) NOT LIKE '%chocolate%'))
`

export const otherAnimalSql = `((LOWER(name) LIKE '%egg plant%') OR (LOWER(name) NOT LIKE '%egg%' AND LOWER(name) NOT LIKE '%honey%'))`

export const glutenSql = `(LOWER(name) LIKE '%floury%' OR LOWER(name) NOT LIKE '%flour%') AND LOWER(name) NOT LIKE '%bread%' AND LOWER(name) NOT LIKE '%wheat%' AND LOWER(name) NOT LIKE '%pasta%' 
AND LOWER(name) NOT LIKE '%lasagne%' AND LOWER(name) NOT LIKE '%macaroni%'`