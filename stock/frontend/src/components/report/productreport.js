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

const ReportPDF = ({ productList }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Product List</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text>Product ID</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>Product Name</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>Description</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>Price</Text>
            </View>
          </View>
          {productList.map(product => (
            <View style={styles.tableRow} key={product.productId}>
              <View style={styles.tableCol}>
                <Text>{product.productId}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>{product.name}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>{product.description}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>Rs.{product.price}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default ReportPDF;
