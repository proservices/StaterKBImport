import { createReadStream, createWriteStream } from 'fs';
import csv from 'csv-parser';

const csv1FilePath = ''; // This should the csv file created from part1js
const csv2FilePath = ''; // This should be the csv with the phrasings so example (TrainingData_Munt-Maartje_Dutch.csv)
const updatedCsv1FilePath = ''; // What would you like the final file called

const csv1Data = [];
const csv2Data = {};
const csv2Categories = {}

// Read data from csv2 and organize it by title
createReadStream(csv2FilePath)
  .pipe(csv())
  .on('data', (row) => {
    // console.log(row)  
    const phrasing = row[Object.keys(row)[0]]
    // console.log('phrasing==>', phrasing)
    const title = row.title.trim()
    const category = row.category.trim();
    // console.log(phrasing)
    if (!csv2Data[title]) {
      csv2Data[title] = [];
    }
    csv2Data[title].push(phrasing);
    csv2Categories[title] = category;
    
  })
  .on('end', () => {
    // console.log(csv2Data)
    // Read data from csv1 and populate phrasing columns
    createReadStream(csv1FilePath)
      .pipe(csv({ separator: ';' }))
      .on('data', (row) => {
        // console.log('Row==>', row)
        const title = row.title;
        // console.log('title==>',title)
        // console.log('csv2Data==>',csv2Data)
        const phrasings = csv2Data[title] || [];
        const category = csv2Categories[title] || '';
        // console.log(category)
        // console.log('Phrasings==>',csv2Data[title])
        for (let i = 0; i < phrasings.length; i++) {
          // console.log(row)
          row[`phrasing${i + 1}`] = phrasings[i];
          // console.log('For Loop==>',row)
        }
        row['category'] = category;
        csv1Data.push(row);
        // console.log(row)
        // console.log( csv1Data[0])
      })
      .on('end', () => {
        
        // Write updated data to csv1
        const writeStream = createWriteStream(updatedCsv1FilePath);

        // Write header
        writeStream.write('state;title;textContent;');
        for (let i = 1; i <= 50; i++) {
          writeStream.write(`phrasing${i};`);
        }
        writeStream.write('category;label;label\n');

        csv1Data.forEach((row) => {
          writeStream.write(`${row.state};${row.title};${row.textContent};`);
          for (let i = 1; i <= 50; i++) {
            writeStream.write(`${row[`phrasing${i}`]};`);
          }
          writeStream.write(`${row.category};${row.label};${row.label}\n`);
        });

        writeStream.end();

        console.log('CSV1 updated successfully.');
      });
  });
