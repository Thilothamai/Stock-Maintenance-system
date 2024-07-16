import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';


const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '25%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    backgroundColor: '#f2f2f2',
    textAlign: 'center',
    padding: 5,
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    textAlign: 'center',
    padding: 5,
  },
});

const ReportPDF = ({ stockList }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Stock details</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text>Product ID</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>Product Name</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>Quantity</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>Last Updated</Text>
            </View>
          </View>
          {stockList.map(stock => (
            <View style={styles.tableRow} key={stock.productId}>
              <View style={styles.tableCol}>
                <Text>{stock.productId}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>{stock.name}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>{stock.quantity}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>{stock.lastUpdated}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default ReportPDF;
