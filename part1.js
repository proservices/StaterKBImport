import csv from 'csv-parser';
import { createReadStream, writeFileSync } from 'fs';
const results = [];

const inputCsv = '' // for example ChatBot Question & Answers - Venn.csv
const finalCsvPart1 = '' //what is the name of the file you want this data written to


createReadStream(inputCsv)
  .pipe(csv({ separator: ';' }))
  .on('data', (data) => results.push(data))
  .on('end', () => {
    // console.log(results);
    writeParsedDataToCSV(results)
  });

function writeParsedDataToCSV(data) {
  // Create new headers for the output CSV
  const newHeaders = ['state', 'title', 'textContent', 'phrasing1', 'phrasing2', 'phrasing3', 'phrasing4', 'phrasing5', 'phrasing6', 'phrasing7', 'phrasing8', 'phrasing9', 'phrasing10', 'phrasing11', 'phrasing12', 'phrasing13', 'phrasing14', 'phrasing15', 'phrasing16', 'phrasing17', 'phrasing18', 'phrasing19', 'phrasing20', 'phrasing21', 'phrasing22', 'phrasing23', 'phrasing24', 'phrasing25', 'phrasing26', 'phrasing27', 'phrasing28', 'phrasing29', 'phrasing30', 'phrasing31', 'phrasing32', 'phrasing33', 'phrasing34', 'phrasing35', 'phrasing36', 'phrasing37', 'phrasing38', 'phrasing39', 'phrasing40', 'phrasing41', 'phrasing42', 'phrasing43', 'phrasing44', 'phrasing45', 'phrasing46', 'phrasing47', 'phrasing48', 'phrasing49', 'phrasing50', 'category', 'label', 'label' ]
  // This assumes there are a max of 50 phrasings, if more do increase above and below
  
  const csvData = data.map(row => ({
    'state' : 'Published', 'title': row['Response Command'].trim(), 'textContent': row['Response Text'].trim(), 'phrasing1': '', 'phrasing2': '', 'phrasing3': '', 'phrasing4': '', 'phrasing5': '', 'phrasing6': '', 'phrasing7': '', 'phrasing8': '', 'phrasing9': '', 'phrasing10': '', 'phrasing11': '', 'phrasing12': '', 'phrasing13': '', 'phrasing14': '', 'phrasing15': '', 'phrasing16': '', 'phrasing17': '', 'phrasing18': '', 'phrasing19': '', 'phrasing20': '', 'phrasing21': '', 'phrasing22': '', 'phrasing23': '', 'phrasing24': '', 'phrasing25': '', 'phrasing26': '', 'phrasing27': '', 'phrasing28': '', 'phrasing29': '', 'phrasing30': '', 'phrasing31': '', 'phrasing32': '', 'phrasing33': '', 'phrasing34': '', 'phrasing35': '', 'phrasing36': '', 'phrasing37': '', 'phrasing38': '', 'phrasing39': '', 'phrasing40': '', 'phrasing41': '', 'phrasing42': '', 'phrasing43': '', 'phrasing44': '', 'phrasing45': '', 'phrasing46': '', 'phrasing47': '', 'phrasing48': '', 'phrasing49': '', 'phrasing50': '', 'category': '', 'label': '', 'label': '' 
  }))
  const csvContent = [newHeaders.join(';')];
  csvData.forEach(row => {
    const values = newHeaders.map(header => row[header].trim());
    csvContent.push(values.join(';'));
  });

  writeFileSync(finalCsvPart1, csvContent.join('\n'));  // writes a new file delimited with semicolons
  console.log('Parsed data with new headers written to output CSV file.');
}  