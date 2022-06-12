import styled from "styled-components";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import {useParams} from "react-router-dom";
import {useState } from "react";

const Container = styled.div``;
const Title = styled.h1`
  margin: 20px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  margin: 20px;
  ${mobile({ margin: "0 20px", display: "flex", flexDirection: "column" })}
`;
const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0" })}
`;
const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0" })}
`;
const Option = styled.option``;

const ProductList = () => {

const { category } = useParams();
console.log(category);

const [filters, setFilters] = useState({});
const [sort, setSort] = useState("newest");

const handleFilters = (e) => {  
    const value = e.target.value;
    if(value !== "-") {
    setFilters({
        ...filters,
        [e.target.name]: value,
    });
  } else {
    setFilters({});
  }
}

console.log(filters)
  return (
    <Container>
      <Navbar />
      <Title>{category}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products</FilterText>
          <Select name="color" onChange={handleFilters} >
            <Option disabled selected>
              Color
            </Option>
            <Option>-</Option>
            <Option>white</Option>
            <Option>black</Option>
            <Option>pink</Option>
            <Option>blue</Option>
            <Option>yellow</Option>
            <Option>green</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option disabled selected>
              Size
            </Option>
            <Option>-</Option>
            <Option>xs</Option>
            <Option>s</Option>
            <Option>m</Option>
            <Option>l</Option>
            <Option>xl</Option>
            <Option>36</Option>
            <Option>36.5</Option>
            <Option>37</Option>
            <Option>37.5</Option>
            <Option>38</Option>
            <Option>38.5</Option>
            <Option>39</Option>
            <Option>39.5</Option>
            <Option>40</Option>
            <Option>40.5</Option>
            <Option>41</Option>
            <Option>41.5</Option>
            <Option>42</Option>
            <Option>42.5</Option>
            <Option>43</Option>
            <Option>43.5</Option>
            <Option>44</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products</FilterText>
          <Select onChange={e=>setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products category={category} filters={filters} sort={sort}/>
      <Newsletter />
      <Footer />
    </Container>
  );
}

export default ProductList;
